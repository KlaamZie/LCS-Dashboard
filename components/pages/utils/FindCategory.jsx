import useCategories from '@/hooks/useCategories';

import PropTypes from 'prop-types';

const FindCategory = ({ category }) => {
  const { categoriesData, isError, isLoading } = useCategories(0);

  const categoryName = (categoryId) => {
    const findCategory = categoriesData.categories.find((el) => el._id === categoryId);
    if (!findCategory) {
      return 'Aucun';
    }
    return findCategory.name;
  };

  if (isError) return 'Erreur...';
  if (isLoading) return 'Chargement...';

  return categoryName(category);
};

FindCategory.propTypes = { category: PropTypes.string.isRequired };

export default FindCategory;
