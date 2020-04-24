import axios from 'axios';

const api_key =
  'trnsl.1.1.20200417T174955Z.50e272e7c0b49e72.f029d53c0eb096c164e64deb10a176a4933203f3';
const apiUrl = 'https://translate.yandex.net/api/v1.5/tr.json/';

class TranslateHelper {
  fetch = async (givenText, selectedLangPair) => {
    const result = await axios.get(
      `${apiUrl}translate?key=${api_key}&text=${givenText}&lang=${selectedLangPair}`,
    );

    return result;
  };

  getLanguages = async () => {
    const result = await axios.get(`${apiUrl}getLangs?ui=en&key=${api_key}`);

    return result;
  };
}

const translateHelperInstance = new TranslateHelper();

export default translateHelperInstance;
