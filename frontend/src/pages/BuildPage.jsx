import React, { useState } from 'react';
import { HowItWorks } from '../components/HowItWorks';
import { Sessions } from '../components/Sessions';
import { Comparator } from '../components/Comparator';
import { CraftModal } from '../components/CraftModal';
import { Footer } from '../components/Footer';
export const BuildPage = () => {
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCardClick = (card) => {
        setModalData(card);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalData(null), 300);
    };
    return (<>
      <HowItWorks />
      <Sessions onCardClick={handleCardClick}/>
      <Comparator />
      <CraftModal isOpen={isModalOpen} onClose={closeModal} data={modalData}/>
      <Footer />
    </>);
};
