import { useState, useEffect } from 'react';

function useData() {
  const [info, setInfo] = useState([]);
  const [loading, setLoadng] = useState(false);

  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    setLoadng(true);
    const getResults = async () => {
      await fetch(url)
        .then((resopnse) => resopnse.json())
        .then((data) => {
          setInfo(data.results);
          setLoadng(false);
        });
    };
    getResults();
  }, []);

  return {
    info,
    loading,
  };
}

export default useData;
