import { Select } from 'antd'
import Search from 'antd/es/input/Search';

function Searching() {
  const handleChange = value => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className='flex gap-5'>
      <Select
        className='select'
        defaultValue="janrlar"
        allowClear
        style={{ width: 200 }}
        onChange={handleChange}
        options={[
          { value: 'janrlar', label: 'Janrlar', disabled: true },
          { value: 'badiiy', label: 'Badiiy adabiyot' },
          { value: 'fantaziya', label: 'Fantaziya' },
          { value: 'ilmiy-fantastik', label: 'Ilmiy fantastika' },
          { value: 'tarixiy', label: 'Tarixiy' },
          { value: 'diniy', label: 'Diniy kitoblar' },

        ]}
      />
      <Search style={{outline: "none"}} allowClear placeholder="Kitob yoki yozuvchi qidirish" onSearch={onSearch} enterButton />
    </div>
  )
}

export default Searching