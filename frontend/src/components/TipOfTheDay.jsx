import { ReactTyped } from 'react-typed';
import FadeInLeft from './FadeInLeft';

const TipOfTheDay = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center">
          <FadeInLeft />
        </div>
        <div className="ml-8">
          <h2 className="text-3xl font-bold mb-8">Tip of the Day</h2>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-8">
              <p className="text-lg text-gray-800 text-center font-semibold">
                <ReactTyped
                  strings={[
                    'Protect your eyes from UV rays by wearing sunglasses outdoors.',
                    'Eat a diet rich in antioxidants and omega-3 fatty acids to support eye health.',
                    'Remember to get regular eye check-ups to monitor your eye health!',
                    'Avoid smoking, as it can increase your risk of developing glaucoma.',
                    'Practice good digital eye habits, such as taking breaks from screens and blinking regularly.',
                  ]}
                  typeSpeed={80}
                  backSpeed={60}
                  loop
                  className="font-medium"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipOfTheDay;
