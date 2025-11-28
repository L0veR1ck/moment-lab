import logo from '../../assets/logo/logo-momen-lab.svg';
import vk from '../../assets/social-link/vk.svg'
import telegram from '../../assets/social-link/telegram.svg'
import whatsapp from '../../assets/social-link/whatsapp.svg'
import { Link } from 'react-router-dom'



function Footer() {
    return (
        <footer className='flex w-full justify-between items-start border-t border-t-[var(--color-blue)]/25 max-w-[1280px]'>
            <div className='flex flex-col gap-[64px] py-[80px]'>
                <div className='flex flex-col gap-2 items-start'>
                    <img className="h-[32px]" src={logo} alt="Moment Lab Logo" />
                    <p className='font-semibold text-lg text-[var(--color-blue)]/55'>
                        Креативное агентство по организации мероприятий
                    </p>
                </div>


                <div className='flex flex-col gap-[4px] items-star'>
                    <a className='text-2xl text-[var(--color-blue)]/80' href="tel:+79121234567">
                        +7 (912) 123 45 67
                    </a>
                    <a className='text-2xl text-[var(--color-blue)]/80' href="mailto:moment.lab@gmail.com">
                        moment.lab@gmail.com
                    </a>
                    <a className='text-lg font-semibold pt-[10px] text-[var(--color-blue)]/80' target="_blank" href="https://yandex.ru/maps/29397/berezovskyi/house/koltsevaya_ulitsa_2v_6/YkkYcQJoTEcDQFtsfXR4d39gYw==/?ll=60.758524%2C56.896337&z=16">
                        г. Березовский, ул. Кольцевая, 2В/6
                    </a>
                </div>


                <div className='flex flex-row gap-[12px]'>
                    <a target="_blank" href="https://vk.com/momentlab"> 
                        <img className="h-[34px]" src={vk} alt="vk" />
                    </a>
                    <a target="_blank" href="https://t.me/momentlab"> 
                        <img className="h-[34px]" src={telegram} alt="telegram" />
                    </a>
                    <a target="_blank" href="https://api.whatsapp.com/send/?phone=79630402828&text&type=phone_number&app_absent=0"> 
                        <img className="h-[34px]" src={whatsapp} alt="whatsapp" />
                    </a>
                </div>

            </div>
            <div className='py-[80px]'>
                <p className='font-semibold text-lg text-[var(--color-blue)] pb-[16px]'>Наши продукты</p>
                <ul className='flex flex-col gap-[8px] text-lg text-[var(--color-blue)] '>
                    <li>
                        <Link to="/" className='cursor-pointer hover:text-[var(--color-dark-blue)] block'>Корпоративные мероприятия</Link>
                    </li>
                    <li>
                        <Link to="/" className='cursor-pointer hover:text-[var(--color-dark-blue)] block'>Частные мероприятия</Link>
                    </li>
                    <li>
                        <Link to="/" className='cursor-pointer hover:text-[var(--color-dark-blue)] block'>Интерактивы</Link>
                    </li>
                    <li>
                        <Link to="/" className='cursor-pointer hover:text-[var(--color-dark-blue)] block'>Аренда помещения</Link>
                    </li>
                </ul>
            </div>


        </footer >
    )

};

export default Footer;