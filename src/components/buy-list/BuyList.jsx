import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UseMyBuyList from "../../hooks/useMyBuyList";
import buyListServics from "../../services/buyListServices";
import PageHeader from "../common/PageHeader";
import ShopingListForm from "./form";
import SortShopingList from "./SortShopingList";
import { v4 as uuid } from "uuid";

const BuyList = () => {
  const list = UseMyBuyList();
  const [mybuyList, setBuyList] = useState(null);

  useEffect(() => {
    setBuyList(list);
  }, [list]);

  const insertItemToList = async (input) => {
    const { prod, amount, unit } = input;
    try {
      await buyListServics.saveItem({
        prod: prod,
        id: uuid(),
        isComplete: false,
        isEdit: false,
        amount: amount,
        unit: unit,
      });
      toast("added successful");
      const { data } = await buyListServics.getAllBuyList();
      setBuyList(data);
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error("something went wrong");
        return;
      }
    }
  };

  const editItemList = (id) => {
    setBuyList((items) =>
      items.map((item) => {
        if (item._id === id) {
          return { ...item, isEdit: true };
        }
        return item;
      })
    );
  };

  const updateItem = async (id, newEdit) => {
    const { prod, amount, unit } = newEdit;
    try {
      await buyListServics.updateItem(id, {
        prod: prod,
        amount: amount,
        unit: unit,
      });
      toast("update successfuly🎉");
    } catch (error) {
      toast.error("somthing went wrong");
      console.log(error);
      return;
    }
    setBuyList((items) =>
      items.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            prod: prod,
            amount: amount,
            unit: unit,
            isEdit: false,
          };
        }
        return item;
      })
    );
  };

  const cancleEditItem = (id) => {
    setBuyList((items) =>
      items.map((item) => {
        if (item._id === id) {
          return { ...item, isEdit: false };
        }
        return item;
      })
    );
  };

  const handleInputCompleteChange = async (id, complete) => {
    try {
      await buyListServics.updateItem(id, {
        isComplete: !complete,
      });
    } catch (error) {
      toast.error("somthing went wrong");
      return;
    }

    setBuyList((items) =>
      items.map((item) => {
        if (item._id === id) {
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      })
    );
  };
  return (
    <>
      <PageHeader
        title="My Shoping List"
        description={
          mybuyList ? "your Shoping List below" : "your Shoping List Is Empty"
        }
      />
      <ShopingListForm onSumbit={insertItemToList} />
      {mybuyList && (
        <SortShopingList
          todos={mybuyList}
          onEdit={editItemList}
          onUpdate={updateItem}
          onCancleEdit={cancleEditItem}
          onInputChange={handleInputCompleteChange}
        />
      )}
    </>
  );
};

export default BuyList;
