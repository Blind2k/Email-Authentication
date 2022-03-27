import PasswordChange from './PasswordChange';
import EmailChange from './EmailChange';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <PasswordChange />
      <EmailChange />
      {/* <EmailChange /> */}
    </section>
  );
};

export default UserProfile;
