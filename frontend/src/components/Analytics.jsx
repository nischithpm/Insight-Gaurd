//import Laptop from '/assets/laptop.jpg'

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
      <img className='w-[500px] mx-auto my-4' src='/assets/laptop.jpg' alt='Laptop Image' />
        <div className='flex flex-col justify-center'>  
          <p className='text-[#00df9a] font-bold '>VISION ANALYTICS PLATFORM</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Visualize Glaucoma Data Effectively</h1>
          <p>
          Gain valuable insights into your glaucoma data with our advanced analytics platform. Our tools allow you to track and analyze various metrics related to glaucoma diagnosis, treatment effectiveness, and patient outcomes. With customizable dashboards and intuitive visualizations, you can make informed decisions to optimize patient care and improve outcomes.
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>  
      </div>
    </div>
  );
};

export default Analytics;
