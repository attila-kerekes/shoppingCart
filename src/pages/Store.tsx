import { useState } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { StorageItem } from "../components/StorageItem";
import { useCategories } from "../hooks/useCategories";
import { Category} from "../types/Category";
import { Subcategory } from "../types/Subcategory";

export function Store() {
  const { categories, loading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <>
      <h1>Store</h1>
      {selectedCategory ? (
        selectedSubcategory ? (
          <>
            <Button onClick={() => setSelectedSubcategory(null)}>Back to Subcategories</Button>
            <Row md={2} xs={1} lg={3} className="g-3">
              {selectedSubcategory.products.map(product => (
                <Col key={product._id}>
                  <StorageItem {...product} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <Button onClick={() => setSelectedCategory(null)}>Back to Categories</Button>
            <ul>
              {selectedCategory.subcategories.map(subcategory => (
                <li key={subcategory._id}>
                  <Button onClick={() => handleSubcategoryClick(subcategory)}>{subcategory.name}</Button>
                </li>
              ))}
            </ul>
          </>
        )
      ) : (
        <ul>
          {categories.map(category => (
            <li key={category._id}>
              <Button onClick={() => handleCategoryClick(category)}>{category.category}</Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
