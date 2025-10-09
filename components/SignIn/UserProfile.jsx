import Text from '../styleComponent/Text';

const UserProfile = (props) => {
  return <Text>{props?.userData?.user?.username} Logged In !</Text>;
};

export default UserProfile;
