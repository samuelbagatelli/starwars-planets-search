import React, { useContext } from 'react';
import Context from '../context';

function Table() {
  const { info, loading, control, setControl, docs, setDocs } = useContext(Context);
  let tableHeads = [];

  if (info[0] !== undefined) {
    tableHeads = Object.keys(info[0]);
  }

  const handleChange = (value) => {
    const filter = info.filter((element) => {
      const name = element.name.toLowerCase();
      const includes = name.includes(value);
      return includes;
    });
    setDocs(filter);
  };

  return (
    <main>
      {loading && (<h1>Carregando...</h1>)}
      <form>
        <label htmlFor="search">
          Pesquisa:
          {' '}
          <input
            name="search"
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => {
              setControl(target.value);
              handleChange(target.value);
            } }
            value={ control }
          />
        </label>
      </form>
      <table>
        <thead>
          <tr>
            {tableHeads.map((element, idx) => {
              const maintence = element.charAt(0).toUpperCase() + element.slice(1);
              const heads = maintence.replace('_', ' ');
              return (
                <th key={ idx }>
                  {heads}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {docs.map((element, index) => {
            const data = Object.values(element);
            return (
              <tr key={ index }>
                {data.map((elem, idx) => (
                  <td key={ idx }>{elem}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
