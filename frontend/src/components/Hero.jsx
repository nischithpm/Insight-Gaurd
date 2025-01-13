import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
        YOUR PARTNER IN EYE HEALTH
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        Protecting your vision.
        </h1>
        {/* <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Fast, accurate diagnosis for
          </p>
          <ReactTyped
            strings={['Glaucoma Awareness', 'Eye Health', 'Vision']}
            typeSpeed={120}
            backSpeed={140}
            loop
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
          />
        </div> */}
  <p className='md:text-5xl sm:text-4xl text-2xl font-bold py-4 text-white-700'>
  Fast, accurate diagnosis for
</p>
<ReactTyped
  strings={['Glaucoma Awareness', 'Eye Health', 'Your Vision']}
  typeSpeed={120}
  backSpeed={140}
  loop
  className='md:text-5xl sm:text-4xl text-2xl font-bold text-[#00df9a] md:pl-4 pl-2 mb-7'
/>

        <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your eye health to prevent vision loss and maintain clarity of sight.</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
