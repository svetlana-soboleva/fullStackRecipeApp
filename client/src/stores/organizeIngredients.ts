export default function organizeIngredients(text: string): string[] {
  const ingredientsArray = text.split(',')
  const trimmedIngredients = ingredientsArray.map((ingredient) => ingredient.trim())
  return trimmedIngredients
}
