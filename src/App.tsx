import { useState } from 'react';
import img1 from './assets/1134807.jpg';
import img2 from './assets/wp2608224-wallpaper-4k.jpg';
import img3 from './assets/large-cliff-pfeiffer-beach-usa-during-sunset.jpg';
import img4 from './assets/daniel-leone-g30P1zcOzXo-unsplash.jpg';

import './App.css';
import Carousel from './components/Carousel';

function App() {
  return (
    <>
      <div>
        <Carousel
          items={[
            {
              id: 1,
              description:
                'blanditiis modi quidem labore eligendi suscipit assumenda iure cumque Nobis voluptatem, tempore inventore blanditiis modi quidem labore eligendi suscipit assumenda iure cumque Nobis voluptatem, tempore inventore',
              image: img1,
              title: 'Title 1',
            },
            {
              description:
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, consequatur molestias tempore esse ipsum eum deserunt suscipit unde sequi doloremque illum laboriosam expedita, deleniti ut qui, quos sint autem fugit?',
              image: img2,
              title: 'Title 2',
              id: 2,
            },
            {
              description:
                'Ab quasi repudiandae earum est ut fuga cum assumenda dolorum sit at. Fugiat blanditiis modi quidem labore eligendi suscipit assumenda iure cumque Nobis voluptatem, tempore inventore, quo minima provident reprehenderit mollitia debitis laudantium ipsa tenetur, doloremque similique sint et culpa vitae. Nihil officiis nobis nostrum consectetur, aut dicta error magnam at ',
              image: img3,
              title: 'Title 3',
              id: 3,
            },
            {
              description:
                ' facilis praesentium quod. Eveniet ipsam pariatur, earum molestiae dicta delectus, explicabo unde ratione id iste blanditiis? Quis et debitis impedit perferendis tempore sequi, excepturi magni. Aliquam atque itaque in consequatur ducimus aut quae! ',
              image: img4,
              title: 'Title 4',
              id: 4,
            },
          ]}
        />
      </div>
    </>
  );
}

export default App;
