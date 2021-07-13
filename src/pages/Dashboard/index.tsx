import { useEffect, useState, useCallback } from 'react'
import Food from '../../components/Food'
import Header from '../../components/Header'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'
import api from '../../services/api'

interface IFoodsItem {
  id: number,
  image: string,
  name: string,
  description: string,
  price: string,
  available: boolean,
}

interface IFoodsProps extends Array<IFoodsItem>{}

export default function Dashboard() {
  const [foods, setFoods] = useState<IFoodsProps>([] as IFoodsProps)
  const [editingFood, setEditingFood] = useState<IFoodsItem>({} as IFoodsItem)
  const [modal, setModal] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<boolean>(false)

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/foods')

      if(response?.data) setFoods(response.data)

    }
    loadData()
  }, [])

  const onHandleAddFood = useCallback(async (food: IFoodsItem) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      setFoods([...foods, response?.data])
    } catch (err) {
      console.log(err)
    }
  }, [foods])

  const onHandleUpdateFood = useCallback(async (food: IFoodsItem) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      )

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      )
      setFoods(foodsUpdated)
    } catch (err) {
      console.error(err)
    }
  }, [foods, editingFood])

  const onHandleDeleteFood = useCallback(async (id: number) => {

    await api.delete(`/foods/${id}`)
    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods(foodsFiltered)
  }, [foods])

  const onHandleToggleModal = useCallback(() => setModal(!modal), [modal])

  const onHandleToggleEditModal = useCallback(() => setEditModal(!editModal), [editModal])

  const onHandleEditFood = useCallback((food: IFoodsItem) => {
    setEditingFood(food)
    setEditModal(true)
  }, [])

  return (
    <>
      <Header openModal={onHandleToggleModal} />
      <ModalAddFood
        isOpen={modal}
        setIsOpen={onHandleToggleModal}
        handleAddFood={onHandleAddFood}
      />
      <ModalEditFood
        isOpen={editModal}
        setIsOpen={onHandleToggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={onHandleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={onHandleDeleteFood}
              handleEditFood={onHandleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )

}