import React, { useContext } from 'react';
import Context from '../context';

function Form() {
  const {
    info,
    formControl,
    setFormControl,
    docs,
    setDocs,
    toFilter,
    setToFilter,
    setFilters,
    setClicked,
  } = useContext(Context);

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
      case 'lesser than':
        return Number(element[column]) < parameter;

      case 'equals to':
        return Number(element[column]) === Number(parameter);

      default:
        return Number(element[column]) > parameter;
      }
    });
    setDocs(checkFilter);
    setFilters((prevState) => ([...prevState, formControl]));
    setClicked(true);
    setToFilter((innerState) => {
      const functions = innerState.filter((element) => element !== column);
      setFormControl((prevState) => ({
        ...prevState,
        column: functions[0],
      }));
      return functions;
    });
  };

  return (
    <form name="form" className="search-form">
      <label htmlFor="search">
        NAME:
        <br />
        <input
          id="search"
          name="search"
          type="text"
          onChange={ ({ target }) => {
            updateFormControl(target);
            handleChange(target.value);
          } }
          value={ formControl.search }
        />
      </label>
      <label htmlFor="column">
        COLUMN:
        <br />
        <select
          id="column"
          name="column"
          onChange={ ({ target }) => updateFormControl(target) }
          value={ formControl.column }
        >
          {toFilter.map((element, idx) => (
            <option
              key={ idx }
              value={ element }
            >
              {element.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="operator">
        OPERATOR:
        <br />
        <select
          id="operator"
          name="operator"
          onChange={ ({ target }) => updateFormControl(target) }
          value={ formControl.operator }
        >
          <option value="bigger than">BIGGER THAN</option>
          <option value="lesser than">LESSER THAN</option>
          <option value="equals to">EQUALS TO</option>
        </select>
        <input
          type="number"
          name="parameter"
          onChange={ ({ target }) => updateFormControl(target) }
          value={ formControl.parameter || '' }
        />
      </label>

      <button type="button" onClick={ handleClick } className="submit-button">
        FILTER
      </button>
    </form>
  );
}

export default Form;
