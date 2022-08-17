import React, { useContext } from 'react';
import Context from '../context';

function Table() {
  const { info, loading } = useContext(Context);
  let tableHeads = [];
  const results = info.reduce((acc, curr) => {
    const { residents, ...obj } = curr;
    return [...acc, obj];
  }, []);

  if (results[0] !== undefined) {
    tableHeads = Object.keys(results[0]);
  }

  return (
    <main>
      <h1>
        {loading && 'Carregando...'}
      </h1>
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
          {results.map((element, index) => {
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
