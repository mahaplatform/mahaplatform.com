// import Buttons from '../buttons'
// import Field from './field'
// import Edit from './edit'
// import New from './new'
//
// _getButtons() {
//   const { user } = this.context.admin
//   const { filter } = this.props
//   const buttons = []
//   if(filter && filter.owner.id === user.id) {
//     buttons.push(this._getDelete())
//     buttons.push(this._getEdit())
//   }
//   buttons.push(this._getSave())
//   return { buttons }
// }
//
// { (!filter || (filter && filter.owner.id === user.id)) &&
//   <div className="maha-criteria-footer">
//     <Buttons { ...this._getButtons() } />
//   </div>
// }
//
//
//   _getDelete() {
//     const { filter } = this.props
//     return {
//       label: 'Delete',
//       color: 'red',
//       confirm: 'Are you sure you want to delete this filter?',
//       request: {
//         method: 'DELETE',
//         endpoint: `/api/admin/${filter.code}/filters/${filter.id}`,
//         onSuccess: () => {
//           this.props.onReset()
//           this.context.flash.set('success', 'The filter was successfully deleted')
//           this.context.filter.pop()
//         }
//       }
//     }
//   }
//
//
//     _getEdit() {
//       const { filter } = this.props
//       return {
//         label: 'Edit',
//         color: 'blue',
//         modal: <Edit filter={ filter } />
//       }
//     }
//
//
//       _getSave() {
//         const { criteria, code, filter } = this.props
//         const id = filter ? filter.id : null
//         return {
//           label: 'Save',
//           color: 'blue',
//           disabled: criteria.$and.length === 0,
//           modal: !id ? <New code={ code } criteria={ criteria } /> : null,
//           request: id ? {
//             endpoint: `/api/admin/${code}/filters/${id}`,
//             method: 'PATCH',
//             body: { criteria },
//             onSuccess: () => {
//               this.context.flash.set('success', 'This filter was successfully saved')
//             }
//           } : null
//         }
//       }
//
//
//         _handleCreate(cindex, value) {
//           this.props.onCreate(cindex, value)
//           this.props.onPop(-2)
//         }
//
//         _handleEdit(cindex, criterion) {
//           const { filter } = this.context
//           const key = Object.keys(criterion)[0]
//           const field = this.props.fields.reduce((found, type) => {
//             return found || type.fields.reduce((found, field) => {
//               return found || (field.key === key ? field : null)
//             }, null)
//           }, null)
//           filter.push({
//             component: Field,
//             props: {
//               defaultValue: criterion[key],
//               field,
//               mode: 'edit',
//               onCancel: this._handleRefresh,
//               onChange: this._handleTest.bind(this, 'edit', cindex),
//               onDone: this._handleUpdate.bind(this, cindex)
//             }
//           })
//         }
//
//
//           _handleUpdate(cindex, value) {
//             this.props.onUpdate(cindex, value)
//             this.props.onPop(-1)
//           }
