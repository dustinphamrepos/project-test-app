import { useTranslation, Trans } from 'react-i18next'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Languages = () => {
  const { t, i18n } = useTranslation()
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language)
  }
  return (
    <>
      <NavDropdown title={i18n.language === 'vi' ? 'Ngôn ngữ' : 'Language'} id="basic-nav-dropdown2" className="languages">
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

export default Languages;