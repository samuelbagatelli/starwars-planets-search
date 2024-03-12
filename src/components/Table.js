import React, { useContext } from 'react';
import './Table.css';
import Context from '../context';
import Form from './Form';

function Table() {
  const {
    info,
    loading,
    docs,
    filters,
    clicked,
  } = useContext(Context);

  let tableHeads = [];

  if (info[0] !== undefined) { tableHeads = Object.keys(info[0]); }

  return (
    <main>
      { loading && <p>LOADING...</p>}
      <div className="container">
        <h4 className="heading">SEARCH:</h4>
        <Form />
      </div>
      {clicked
        && filters.map((element, idx) => (
          <section key={ idx }>
            <span>
              {element.column.toUpperCase()}
              {' '}
            </span>
            <span>
              {element.operator.toUpperCase()}
              {' '}
            </span>
            <span>{element.parameter.toUpperCase()}</span>
          </section>
        ))}
      <table>
        <thead>
          <tr data-testid="table-header">
            {tableHeads.map((element, idx) => (
              <th key={ idx }>
                {element.replace('_', ' ').toUpperCase()}
              </th>
            ))}
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
