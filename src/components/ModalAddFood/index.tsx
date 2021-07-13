import { useCallback, useRef } from 'react'
import { SubmitHandler, FormHandles } from '@unform/core'
import { FiCheckSquare } from 'react-icons/fi'
import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface Food {
  id: number,
  image: string,
  name: string,
  description: string,
  price: string,
  available: boolean,
}

interface IModalAddFoodProps {
  setIsOpen(): void
  handleAddFood(data: Food): void
  isOpen: boolean
}

export default function ModalAddFood({ setIsOpen, handleAddFood, isOpen }: IModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null)

  const onHandleSubmit = useCallback<SubmitHandler>((data: Food) => {
    handleAddFood(data)
    setIsOpen()
  }, [handleAddFood, setIsOpen])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={onHandleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
