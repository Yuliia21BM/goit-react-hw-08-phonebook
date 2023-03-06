import { DefaultTitle, DefaultImg, DefaultWraper } from './DefaultPage.styled';
import sadSmile from '../../images/sad-smile.png';
const DefaultPage = () => {
  return (
    <DefaultWraper>
      <DefaultImg src={sadSmile} alt="sad smile" />
      <DefaultTitle>
        Something went wrong! Please, reload the page!
      </DefaultTitle>
    </DefaultWraper>
  );
};

export default DefaultPage;
