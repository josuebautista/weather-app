import { cn } from '@/utils/cn'
import { ChangeEventHandler, FormEventHandler } from 'react'
import { IoSearch } from 'react-icons/io5'

const SearchBox = ({
  value,
  onChange,
  onSubmit,
  className
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
  className?: string
}) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={cn('flex relative items-center justify-center h-10', className)}>
      <input
        type="text"
        value={value}
        placeholder='Search location...'
        className='px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-noen focus:border-blue-500 h-full'
        onChange={onChange}
      />
      <button
        className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md marker:focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full'
      >
        <IoSearch />
      </button>
    </form>
  )
}

export default SearchBox