// CategoryScroller.tsx
import React from 'react';
import { IonButton, IonIcon, IonSegment, IonLabel, IonSegmentButton } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';

interface CategoryScrollerProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (newCategory: string) => void;
}

const CategoryScroller: React.FC<CategoryScrollerProps> = ({ categories, selectedCategory, onCategoryChange }) => {

  const scrollPrevious = () => {
    const categoryIndex = categories.indexOf(selectedCategory);
    const prevIndex = categoryIndex > 0 ? categoryIndex - 1 : categories.length - 1;
    onCategoryChange(categories[prevIndex]);
  };

  const scrollNext = () => {
    const categoryIndex = categories.indexOf(selectedCategory);
    const nextIndex = categoryIndex < categories.length - 1 ? categoryIndex + 1 : 0;
    onCategoryChange(categories[nextIndex]);
  };

  return (
    <>
      <IonButton fill="clear" onClick={scrollPrevious}>
        <IonIcon icon={arrowBack} />
      </IonButton>

      <IonSegment
        value={selectedCategory}
        onIonChange={e => {
          const newValue = String(e.detail.value);
          onCategoryChange(newValue);
        }}
        scrollable
      >
        {categories.map((category, index) => (
          <IonSegmentButton key={index} value={category} className={selectedCategory === category ? 'selected-category' : ''}>
            <IonLabel style={{ fontSize: '1.0em', padding: '8px 16px' }}>{category}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>

      <IonButton fill="clear" onClick={scrollNext}>
        <IonIcon icon={arrowForward} />
      </IonButton>


    </>
  );
}

export default CategoryScroller;
