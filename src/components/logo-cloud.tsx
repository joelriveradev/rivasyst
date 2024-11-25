import Image from 'next/image'

export function LogoCloud() {
  return (
    <div className='w-full my-20'>
      <p className='mb-14 md:mb-4 mx-auto lg:text-xl text-center text-stone-300'>
        I've worked with some of the largest brands in the world
      </p>

      <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 lg:gap-16'>
        <Image
          src='/ibm.svg'
          width={160}
          height={60.8}
          priority
          alt='IBM logo'
          className='scale-75 lg:scale-100'
        />

        <Image
          src='/ms.svg'
          width={360}
          height={51.8}
          priority
          alt='Morgan Stanley logo'
          className='scale-75 lg:scale-100'
        />

        <Image
          src='/cnn.svg'
          width={160}
          height={74.7}
          priority
          alt='CNN logo'
          className='scale-75 lg:scale-100 md:-ml-4 lg:-ml-3'
        />

        <Image
          src='/watson.svg'
          width={100}
          height={92.5}
          priority
          alt='IBM Watson logo'
          className='md:ml-8 lg:-ml-3'
        />
      </div>
    </div>
  )
}
