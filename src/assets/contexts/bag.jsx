import { useBag } from "./BagContext";

function Bag() {
    const { bag, setBag } = useBag();
  
    /*const removeFromBag = (id) => {
      const updatedBag = bag.filter((item) => item.id !== id);
      setBag(updatedBag);*/
    };

    return (
        <div>
            {console.log(bag)}
        </div>
    );

export default Bag;