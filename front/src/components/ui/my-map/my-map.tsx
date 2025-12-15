import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

function MyMap() {
    return (
        <YMaps query={{ apikey: 'b4a042c3-69b4-42b4-a443-32b6acf11042' }}>
            <Map
                defaultState={{
                    center: [56.896337, 60.758524],
                    zoom: 15
                }}
                width="100%"
                height="500px"
            >
                <Placemark
                    geometry={[56.896337, 60.758524]}
                    properties={{
                        iconContent: 'Момент.Лаб'
                    }}
                    options={{
                        preset: 'islands#redStretchyIcon'
                    }}
                />
            </Map>
        </YMaps>
    );
}

export default MyMap;