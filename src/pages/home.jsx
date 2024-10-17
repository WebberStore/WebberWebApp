import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination } from 'flowbite-react';
import { debounce } from 'lodash';
import { Button, NoRecords } from '../components/common';
import { default as Layout } from '../components/layout';
import { getAllProducts } from '../services/product';

const Home = () => {
  const [productRes, setproductRes] = useState(null);
  const [page, setPage] = useState(1);

  const user = useSelector((store) => store.data.user.authUser);

  const refresh = debounce(() => {
    getAllProducts(page).then((res) => {
      setproductRes(res);
    });
  }, 300);

  useEffect(() => {
    refresh();
  }, [page]);

  const showAddProductBtn = user.role === 'Seller' || user.role === 'Admin'

  return (
    <Layout title="Home">
      <div class="w-screen flex flex-col justify-center items-center pt-6">
        {productRes && (
          <>
            {showAddProductBtn && (
              <div class="w-11/12 flex justify-end items-center mt-6 lg:mt-0">
                <Link to="/product-add">
                  <Button className="py-1.5 px-6 mb-2">Add Product</Button>
                </Link>
              </div>
            )}
            <div class="w-11/12 min-h-[80vh] flex flex-col justify-between items-center mb-16">
              <div class="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {productRes.items?.length > 0 ? (
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-6">
                    {productRes.items?.map((product) => {
                      return (
                        <Link to={`/product-detail/${product.id}`}>
                          <div className="w-full h-[30vh] border-2 border-base-primary relative rounded-md hover:scale-102 transition-all duration-300 cursor-pointer">
                            <img className="w-full h-full object-cover rounded-md aspect-square" src={product.imageUrl} />
                            <div className="w-full absolute bottom-0 py-3 min-h-14 bg-black/80 rounded-b-md flex flex-row justify-between items-center text-white px-6">
                              <span>{product.name}</span>
                              <span>Rs. {product.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <NoRecords text="No Products Found" className="mt-12" />
                )}
              </div>
              <div class="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                  }}
                  showIcons={true}
                  totalPages={Math.floor(productRes.totalCount / productRes.pageSize)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
