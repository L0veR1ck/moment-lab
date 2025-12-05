import Footer from '../../components/footer/footer';
import FormSection from '../../components/form-section/form-section';
import Header from '../../components/header/header';
import InfoSection from '../../components/info-section/info-section';
import StartSection from '../../components/start-section/start-section';
import ProgramSection from '../../components/program-section/program-section';
import ClientsSection from '../../components/clients-section/clients-section';
import ReviewsSection from '../../components/review-section/reviews-section';



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
