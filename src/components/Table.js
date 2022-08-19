import React, { useContext } from 'react';
import Context from '../context';

function Table() {
  const {
    info,
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
  } = useContext(Context);

  let tableHeads = [];

  if (info[0] !== undefined) {
    tableHeads = Object.keys(info[0]);
  }

  const updateFormControl = (target) => {
    const { name, value } = target;
    setFormControl((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleChange = (value) => {
    const infoFilter = info.filter((element) => {
      const name = element.name.toLowerCase();
      const includes = name.includes(value);
      return includes;
    });
    setDocs(infoFilter);
  };

  const handleClick = () => {
    const { column, operator, parameter } = formControl;
    const check = docs.length !== 0 ? docs : info;
    const checkFilter = check.filter((element) => {
      switch (operator) {
      case 'menor que':
        return Number(element[column]) < parameter;
      case 'igual a':
        return Number(element[column]) === Number(parameter);
      default:
        return Number(element[column]) > parameter;
      }
    });
    setDocs(checkFilter);
    setFilters((prevState) => ([...prevState, formControl]));
    setClicked(true);
    setToFilter((innerState) => {
      const funciona = innerState.filter((element) => element !== column);
      setFormControl((prevState) => ({
        ...prevState,
        column: funciona[0],
      }));
      return funciona;
    });
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
              updateFormControl(target);
              handleChange(target.value);
            } }
            value={ formControl.search }
          />
        </label>
        <label htmlFor="column">
          Coluna:
          {' '}
          <select
            name="column"
            onChange={ ({ target }) => updateFormControl(target) }
            value={ formControl.column }
            data-testid="column-filter"
          >
            {toFilter.map((element, idx) => (
              <option
                key={ idx }
                value={ element }
              >
                {element}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="operator">
          Operador:
          {' '}
          <select
            name="operator"
            onChange={ ({ target }) => updateFormControl(target) }
            value={ formControl.operator }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="parameter"
          onChange={ ({ target }) => updateFormControl(target) }
          value={ formControl.parameter }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ handleClick }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      {clicked
        && filters.map((element, idx) => (
          <section key={ idx }>
            <span>{element.column}</span>
            <span>{element.operator}</span>
            <span>{element.parameter}</span>
          </section>
        ))}
      <table>
        <thead>
          <tr data-testid="table-header">
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
