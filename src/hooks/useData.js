import { useState, useEffect } from 'react';

function useData() {
  const [info, setInfo] = useState([]);
  const [loading, setLoadng] = useState(false);
  const [control, setControl] = useState('');
  const [docs, setDocs] = useState([]);

  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    setLoadng(true);
    const getResults = async () => {
      await fetch(url)
        .then((resopnse) => resopnse.json())
        .then(({ results }) => {
          const treatedResults = results.reduce((acc, curr) => {
            const { residents, ...obj } = curr;
            return [...acc, obj];
          }, []);
          setInfo(treatedResults);
          setLoadng(false);
          setDocs(treatedResults);
        });
    };
    getResults();
  }, []);

  return {
    info,
    setInfo,
    loading,
    control,
    setControl,
    docs,
    setDocs,
  };
}

export default useData;
