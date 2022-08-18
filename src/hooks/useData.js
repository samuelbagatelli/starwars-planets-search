import { useState, useEffect } from 'react';

function useData() {
  const [info, setInfo] = useState([]);
  const [loading, setLoadng] = useState(false);
  const [formControl, setFormControl] = useState(
    {
      column: 'population',
      operator: 'maior que',
      parameter: 0,
    },
  );
  const [docs, setDocs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [clicked, setClicked] = useState(false);

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
    formControl,
    setFormControl,
    docs,
    setDocs,
    filters,
    setFilters,
    clicked,
    setClicked,
  };
}

export default useData;
