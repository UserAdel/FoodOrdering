import Hero from '@/components/ui/Hero';
import Header from '../components/Header';
import Footer from '@/components/Footer';

type Props={
  children: React.ReactNode;
};

const Layout=({children}: Props)=>{
    
  return (
    <div className="flex flex-col max-h-screen">
        <Header/>
        <Hero/> 
        <div className="container mx-auto flex-1 py-10">
            {children}
        </div>
        <Footer/>
    </div>
  );
}

export default Layout;