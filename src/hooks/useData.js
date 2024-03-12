import { useState, useEffect } from 'react';

function useData() {
  const filter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [info, setInfo] = useState([]);
  const [loading, setLoadng] = useState(false);
  const [formControl, setFormControl] = useState(
    {
      search: '',
      column: 'population',
      operator: 'bigger than',
      parameter: 0,
    },
  );
  const [docs, setDocs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [toFilter, setToFilter] = useState(filter);

  const site = 'https://swapi.py4e.com/api/planets/';

  useEffect(() => {
    setLoadng(true);
    const getResults = async () => {
      await fetch(site)
        .then((response) => response.json())
        .then(({ results }) => {
          const treatedResults = results.reduce((acc, curr) => {
            const { residents, films, created, edited, url, ...obj } = curr;
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
    toFilter,
    setToFilter,
  };
}

export default useData;
