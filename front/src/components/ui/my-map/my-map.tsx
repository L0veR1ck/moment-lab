import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function MyMap() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
      <YMaps query={{ apikey: 'b4a042c3-69b4-42b4-a443-32b6acf11042' }}>
        <Map
          defaultState={{
            center: [56.896337, 60.758524],
            zoom: 15,
          }}
          width="100%"
          height="100%"
        >
          <Placemark
            geometry={[56.896337, 60.758524]}
            properties={{
              iconContent: 'Момент.Лаб',
            }}
            options={{
              preset: 'islands#redStretchyIcon',
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}

export default MyMap;
