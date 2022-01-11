import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Context
import { useContext } from 'react';
import StepContext from './context/stepContext';

// Components
import Stepper from './components/Stepper/Stepper';

// Pages
import Personal from './pages/Personal/Personal';
import Identity from './pages/Identity/Identity';
import Contact from './pages/Contact/Contact';
import Authentication from './pages/Authentication/Authentication';

// CSS
import './pages/Page.scss';
import 'react-toastify/dist/ReactToastify.css';
const mainCss = {
	marginBottom: '5rem'
}

const App = (props) => {
	const location = useLocation();
	const currentUrl = location.pathname;
	const { setStep } = useContext(StepContext);
	useEffect(() => {
		switch (currentUrl) {
			case "/":
				setStep(1)
				break;
			case "/identity":
				setStep(2);
				break;
			case "/contact":
				setStep(3);
				break;
			case "/authentication":
				setStep(4);
				break;
		}
	}, [currentUrl]);

	return (
		<div className='container mx-auto'>
			<Stepper />
			<main style={mainCss}>

				<Routes>
					<Route path='/' element={<Personal />} />
					<Route path='/identity' element={<Identity />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/authentication' element={<Authentication />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>

			</main>
		</div>
	);
}

export default App;