import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';
import ClientsSection from './components/clients-section/clients-section';
import FormSection from './components/form-section/form-section';
import InfoSection from './components/info-section/info-section';
import ProgramSection from './components/program-section/program-section';
import ReviewsSection from './components/review-section/reviews-section';
import StartSection from './components/start-section/start-section';



function MainScreen() {

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <main className='flex flex-col items-center'>
        <StartSection/>
        <InfoSection/>
        <ProgramSection/>
        <ClientsSection/>
        <ReviewsSection/>
        <FormSection/>
      </main>
      <Footer />
    </div>
  );
}

export default MainScreen;
