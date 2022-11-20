import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './style.css';

const animatedComponents = makeAnimated();

const options = [
  { value: 'All Tools', label: 'All Tools' },
  { value: 'Informational Handout', label: 'Informational Handout' },
  { value: 'Writing Prompt', label: 'Writing Prompt' },
  { value: 'Idea Generator', label: 'Idea Generator' },
  { value: 'Weekly Newsletter', label: 'Weekly Newsletter' },
  { value: 'Research Project Generator', label: 'Research Project Generator' },
  { value: 'Real World Benefits', label: 'Real World Benefits' },
  { value: 'Lesson Planner', label: 'Lesson Planner' },
  { value: 'Parent emails', label: 'Parent emails' },
];

export const MultiSelect = props => {
  const [selectedOptions, setSelectedOptions] = useState(options[0]);

  const handleSelect = async (values, chosenOption) => {
    if (chosenOption?.option?.value === 'All Tools' || values.length === 0) {
      setSelectedOptions([{ value: 'All Tools', label: 'All Tools' }]);
      await props.filterHandler('completions', 'All Tools');
    } else {
      const newSelectedOptions = values.filter(
        option => option.value !== 'All Tools'
      );
      setSelectedOptions(newSelectedOptions);
      await props.filterHandler(
        'completions',
        newSelectedOptions.map(option => option.value)
      );
    }
  };

  const filterOptions = (options, inputValue) => {
    console.log(options, inputValue);
  };
  return (
    <>
      <Select
        defaultValue={[options[0]]}
        components={animatedComponents}
        isMulti
        value={selectedOptions}
        options={options}
        onChange={handleSelect}
        className="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={false}
        isRtl={false}
        filterOptions={null}
        closeMenuOnSelect={false}
      />
    </>
  );
};
