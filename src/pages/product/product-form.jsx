import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdPhotoCamera } from 'react-icons/md';
import { Layout } from '../../components/layout';
import { Button, Dropdown, Input } from '../../components/common';
import { createProduct, getAllCategories, getSingleProduct, updateProduct } from '../../services';
import { setFormData } from '../../store/ui/products';
import { useEffectOnce } from '../../hooks';
import toast from '../../libs/toastify';
import base64EncodeImage from '../../utils/image';

const ProductForm = () => {
  const { product_id: productId } = useParams();

  const [categories, setCategories] = useState([]);

  const { formData } = useSelector((state) => state.ui.products);

  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const input = useRef(null);

  const handleInputChange = ({ target: { id, value } }) => {
    dispatch(
      setFormData({
        ...formData,
        categoryId: formData.categoryId ? Number(formData.categoryId) : undefined,
        [id]: value?.trim(),
      }),
    );
  };

  useEffectOnce(() => {
    getAllCategories().then((data) => {
      setCategories(data);
      dispatch(setFormData({ categoryId: data[0].id }));
    });
  }, []);

  useEffectOnce(() => {
    if (productId) {
      getSingleProduct(productId).then(({ data }) => {
        dispatch(setFormData({ ...data, exp_date: data.exp_date.substring(0, 10), manufactured_date: data.manufactured_date.substring(0, 10) }));
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await (productId ? updateProduct(productId, formData) : createProduct(formData));
    if (data) {
      navigateTo('/');
      setTimeout(() => {
        dispatch(setFormData({}));
        toast.success(data.message);
      }, 300);
    }
  };

  return (
    <div>
      <Layout title="Home">
        <div>
          <h2 class="text-4xl font-bold leading-tight lg:text-5xl px-6 md:px-24 mt-6">{productId ? 'Edit' : 'Add'} Product</h2>
          <form onSubmit={handleSubmit}>
            <div class="bg-gray-100/10 rounded-xl shadow border-2 p-6 md:p-12 mx-6 md:mx-24 my-6">
              <div class="flex flex-col">
                <div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="name" placeholder="Product Name" label wrapperclasses="w-full" onChange={handleInputChange} required value={formData.name} />
                  <Dropdown id="categoryId" filterkey="categoryId" label="Category" options={categories?.map((c) => ({ key: c.id?.toString(), label: c.name }))} className="h-14" wrapperclasses="my-2 sm:my-0" onChange={handleInputChange} />
                </div>
                <div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="price" type="number" placeholder="Price Rs" label wrapperclasses="w-full" onChange={handleInputChange} required value={formData.price} />
                </div>
                <div class="flex flex-col lg:flex-row justify-between items-center gap-x-3">
                  <Input id="description" placeholder="Product Description" label textarea rows="5" wrapperclasses="w-full" onChange={handleInputChange} required value={formData.description} />
                </div>
              </div>
              <div class="my-3 font-semibold">Product Image</div>
              <div
                className="w-full h-[60vh] bg-gray-300 hover:bg-gray-400 mt-6 mb-10 rounded-md flex justify-center items-center cursor-pointer transition-all duration-300"
                onClick={() => input.current?.click()}
              >
                {!formData.imageUrl && <MdPhotoCamera className="w-24 h-24 text-white" />}
                {formData.imageUrl && <img className="w-full h-full object-cover" src={formData.imageUrl} />}
              </div>
              <input ref={input} accept="image/" type="file" class="hidden" onChange={async (e) => handleInputChange({ target: { id: 'imageUrl', value: await base64EncodeImage(e.target.files) } })} />
              <Button className="w-full py-4">{productId ? 'Edit' : 'Add'} Batch</Button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ProductForm;
