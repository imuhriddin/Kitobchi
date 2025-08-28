import React from 'react'
import { NavLink } from 'react-router'
import Searching from '../components/Searching'
import RecentlyUplods from '../components/RecentlyUplods'
import TopBooks from '../components/TopBooks'

function Home() {
  return (
    <>
      <section className=' bg-[#E4E4E7]'>
        <div className='mx-auto max-w-[1220px] px-5 py-34'>
          <div className=' flex flex-col items-center'>
            <h2 className='title-font text-5xl text-center text-[#6366F1]'>Kitob sotib oling</h2>
            <h2 className='title-font text-5xl text-center text-[#6366F1]'>Kitob ijaraga olib o'qing</h2>
            <h2 className='title-font text-5xl text-center text-[#6366F1]'>Kitobingizni oson soting</h2>
            <p className='text-3xl text-center mt-3'><span className='text-[#1E1B4B] font-bold'>Kitobchi</span> - kitoblarni oson oldi-berdi qilish.</p>
            <div className='flex items-center gap-8 py-12'>
              <NavLink to={'/books'} className={'btn btn-hover'}>Kitob olish</NavLink>
              <NavLink to={'/announcement'} className={'btn btn-hover'}>Kitob sotish</NavLink>
              <NavLink to={'/announcement'} className={'btn btn-hover'}>Ijaraga berish</NavLink>
            </div>
            {/* <input className='bg-white border-2 border-[#6366F1] outline-none rounded-md py-1 px-3 text-lg' type="text" placeholder='Kitob qidirish...' /> */}
            <Searching />
          </div>
        </div>
      </section>
      <section>
        <RecentlyUplods />
        <TopBooks />
      </section>
    </>
  )
}

export default Home