import Footer from '../../components/footer/footer';
import FormSection from '../../components/section-form/section-form';
import Header from '../../components/header/header';
import InfoSection from '../../components/info-section/info-section';
import StartSection from '../../components/start-section/start-section';



function MainScreen() {

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <main className='flex flex-col items-center'>
        <StartSection/>
        <InfoSection/>
        <FormSection/>
      </main>
      <Footer />
    </div>
  );
}

export default MainScreen;
