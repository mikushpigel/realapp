import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UseMyBuyList from "../../hooks/useMyBuyList";
import buyListServics from "../../services/buyListServices";
import PageHeader from "../common/PageHeader";
import ShopingListForm from "./form";
import SortShopingList from "./SortShopingList";

const BuyList = () => {
  const list = UseMyBuyList();
  const [mybuyList, setBuyList] = useState(null);

  useEffect(() => {
    setBuyList(list);
  }, [list]);

  const insertItemToList = (input) => {
    // setBuyList((oldVal))
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
