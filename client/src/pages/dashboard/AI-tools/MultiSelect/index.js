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

export const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = () => {
    console.log(selectedOptions);
  };

  return (
    <>
      <Select
        defaultValue={[options[0]]}
        components={animatedComponents}
        isMulti
        options={options}
        onChange={item => setSelectedOptions(item)}
        className="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={false}
        isRtl={false}
        closeMenuOnSelect={false}
      />
    </>
  );
};
