const Cards = () => {
    return (
      <div className='w-full py-[10rem] px-4 bg-white'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-3rem] bg-white' src='/assets/single.png' alt="Single User" />
                <h2 className='text-2xl font-bold text-center py-8'>Eye Disease Diagnosis</h2>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Diagnostic tests for eye diseases</p>
                    <p className='py-2 border-b mx-8'>Expert consultation with doctor</p>
                    <p className='py-2 border-b mx-8'>Comprehensive evaluation for accurate diagnosis</p>
                </div>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Learn More</button>
            </div>
            <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src='/assets/double.png' alt="Double User" />
                <h2 className='text-2xl font-bold text-center py-8'>Glaucoma Management Services</h2>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Customized treatment way for glaucoma</p>
                    <p className='py-2 border-b mx-8'>Advanced options available</p>
                    <p className='py-2 border-b mx-8'>Dedicated detail for support</p>
                </div>
                <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Learn More</button>
            </div>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-3rem] bg-white' src='/assets/triple.png' alt="Triple User" />
                <h2 className='text-2xl font-bold text-center py-8'>Personalized Family Dashboard</h2>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Create a centralized access</p>
                    <p className='py-2 border-b mx-8'>Track health metrics and report</p>
                    <p className='py-2 border-b mx-8'>Receive alerts and analysis via mail</p>
                </div>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Get Started</button>
            </div>
        </div>
      </div>
    );
  };
  
  export default Cards;
  