import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Step, stepSchema } from '@server/entities/step'
import { TRPCError } from '@trpc/server'
import { Recipe } from '@server/entities/recipe'

export default authenticatedProcedure
  .input(stepSchema)
  .mutation(async ({ input: stepData, ctx: { authUser, db } }) => {
    const stepRepository = db.getRepository(Step);
    const recipeRepository = db.getRepository(Recipe);

    const recipe = await recipeRepository.findOne({
      where: { id: stepData.recipeId },
      relations: ['steps'], 
    });

    if (!recipe) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Recipe not found',
      });
    }

    if (recipe.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to edit this recipe',
      });
    }

    const step = await stepRepository.findOne({
      where: { id: stepData.id, recipe: { id: stepData.recipeId } },
    });

    if (!step) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Step is deleted',
      });
    }
    
    Object.assign(step, stepData);
    await stepRepository.save(step);

    return { success: true, message: 'Steps updated successfully' };
  });