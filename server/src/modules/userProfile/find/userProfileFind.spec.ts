import { authContext } from '@tests/utils/context';
import { fakeUserProfile } from '@server/entities/tests/fakes';
import setupTest from '@server/entities/tests/setup';
import userProfileRouter from '..';

const { db, users } = await setupTest();
const { create } = userProfileRouter.createCaller(authContext({ db }, users[0]));
const { find } = userProfileRouter.createCaller(authContext({ db }, users[0]));

it('should return information about the user by provided id', async () => {
  const userProfileData = {
    userId: users[0].id,
    about: 'This is about',
    name: 'Kevin',
  };
  const userProfile = await create(fakeUserProfile(userProfileData));

  const foundProfile = await find();

  expect(foundProfile).toMatchObject({
    userId: userProfile.userId,
    about: userProfileData.about,
    name: userProfileData.name,
    
  });
});



