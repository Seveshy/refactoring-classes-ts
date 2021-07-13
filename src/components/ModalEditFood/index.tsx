import { useCallback, useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { Form } from './styles'
import { SubmitHandler, FormHandles } from '@unform/core'
import Modal from '../Modal'
import Input from '../Input'

interface IFormData {
  id: number,
  image: string,
  name: string,
  description: string,
  price: string,
  available: boolean,
}

interface PropsModalEditFood {
  setIsOpen(): void
  isOpen: boolean
  handleUpdateFood(data: IFormData): void
  editingFood: IFormData
}

export default function ModalEditFood({ handleUpdateFood, setIsOpen, isOpen, editingFood  }: PropsModalEditFood) {
  const formRef = useRef<FormHandles>(null)

  const onHandleSubmit = useCallback<SubmitHandler>(async (data: IFormData) => {
    handleUpdateFood(data);
    setIsOpen();
  }, [setIsOpen, handleUpdateFood])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={onHandleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}