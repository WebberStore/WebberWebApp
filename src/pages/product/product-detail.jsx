import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from 'flowbite-react';
import { Layout } from '../../components/layout';
import { Button } from '../../components/common';
import { useEffectOnce } from '../../hooks';
import { setFormData } from '../../store/ui/products';
import { getSingleProduct, deleteProduct, addProductRating } from '../../services';
import toast from '../../libs/toastify';

function ProductDetail() {
  const { product_id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.data.user.authUser);

  useEffect(() => {
    const singleProduct = async () => {
      const response = await getSingleProduct(productId);
      setProduct(response);
    };
    singleProduct();
  }, [productId]);

  useEffect(() => {
    setRating(product.reviews?.find((r) => r.user === user.id)?.rating ?? 0);
  }, [product]);

  useEffectOnce(() => {
    setCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
  });

  const onClickEdit = () => {
    navigate(`/product-edit/${productId}`);
    dispatch(setFormData({ ...product, exp_date: product.exp_date.substring(0, 10), manufactured_date: product.manufactured_date.substring(0, 10) }));
  };

  const onClickAddToCart = () => {
    if (!user?.id) return toast.warn('You need to be logged in before adding an item to a cart');
    setCart([...cart, productId]);
    localStorage.setItem('cart', JSON.stringify([...cart, productId]));
    toast.success('Product added to cart successfully');
  };

  const onClickRemoveFromCart = () => {
    const updatedCart = cart.filter((product) => product !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Product removed from cart successfully');
  };

  const onRatingClick = (rating) => {
    if (!user.id) return toast.warn('You need to be logged in before rating an item');
    setRating(rating);
    addProductRating(productId, rating);
  };

  return (
    <Layout title="ProductDetail">
      <div class=" bg-gray-100/10 rounded-xl shadow border-2 mx-6 md:mx-24 my-6 p-4 relative">
        <div class="flex flex-col lg:flex-row px-4 md:px-10 pt-10">
          <img class="rounded shadow-md object-cover w-full h-[50vh]" src={product.imageUrl}></img>
          <div class="space-y-4 py-3 mt-4 lg:mt-0 md:px-10 lg:text-right">
            <div class="block font-bold text-gray-600 text-4xl md:text-6xl">{product.name}</div>
            <div class="block text-gray-600 text-lg">{product.description}</div>
            <p class="block font-bold text-gray-600 text-2xl"> Rs {product.price?.toFixed(2)}</p>
            <p class="text-base text-red-500 py-0">
              <abbr title="Required field">*</abbr>
              Inclusive of All Taxes & Charges
            </p>
            <div className="w-full flex lg:justify-end items-center -translate-x-3 lg:translate-x-3">
              <Rating>
                {Array.from(Array(5).keys()).map((_, i) => {
                  return (
                    <div onClick={() => onRatingClick(i + 1)}>
                      <Rating.Star filled={i <= rating - 1} className="w-16 h-16 cursor-pointer hover:brightness-110 transition-all duration-300" />
                    </div>
                  );
                })}
              </Rating>
            </div>
          </div>
        </div>
        <div class="space-y-4 py-3 px-4 md:px-10 pt-12">
          <div className="pt-1">
            <Button
              className={`w-full py-4 text-base mt-4 ${cart.includes(productId) ? '' : 'bg-green-500 hover:bg-green-400'} ${product.stock <= 0 ? 'bg-gray-700 pointer-events-none cursor-default' : ''
                }`}
              onClick={cart.includes(productId) ? onClickRemoveFromCart : onClickAddToCart}
            >
              {product.stock <= 0 ? 'Out of Stock' : cart.includes(productId) ? 'Remove from cart' : 'Add to cart'}
            </Button>
            {user.role === 'Admin' ||
              (user.role === 'Seller' && user.id === product.sellerId && (
                <>
                  <Link to="/">
                    <Button className="w-full py-4 text-base bg-red-500 hover:bg-red-600 mt-4" onClick={() => deleteProduct(productId)}>
                      Delete
                    </Button>
                  </Link>
                  <Button className="w-full py-4 text-base mt-4" onClick={onClickEdit}>
                    Edit
                  </Button>
                </>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
