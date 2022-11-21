import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './style.css';

const animatedComponents = makeAnimated();

const options = [
  { value: 'All Tools', label: 'All Tools' },
  { value: 'AI Freestyle', label: 'AI Freestyle' },
  { value: 'Idea Generator', label: 'Idea Generator' },
  { value: 'Informational Handout', label: 'Informational Handout' },
  { value: 'Lesson Planner', label: 'Lesson Planner' },
  { value: 'Parent emails', label: 'Parent emails' },
  { value: 'Real World Benefits', label: 'Real World Benefits' },
  { value: 'Research Project Generator', label: 'Research Project Generator' },
  { value: 'Writing Prompt', label: 'Writing Prompt' },
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
