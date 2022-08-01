import React, { useState } from 'react'
import { JSONSchema7 } from "json-schema";
import Form from "@rjsf/core";

export default function FormShema(props:any) {

    const [formInput,setFormInput]=useState<any>()
    const schema = props.props ;
      console.log(formInput);
      
  return (
    <div>
        <Form   schema={schema as JSONSchema7}
         formData={formInput}
        //  onChange={e=>setFormInput(e.formData)}
         onSubmit={(e)=>setFormInput(e.formData)
         }
        />
    </div>  
  )
}


// import React, { useState } from "react";


// interface title {
//      title: string,
//      type: string,
//      required : object,
//      properties : any
// }



// export default function FormShema(props:title) {
//     const [form, setForm] = useState<any>([]);
//     const inputForm: any = [];

//     const titleInput= Object.keys(props.properties);
     
//     if (titleInput) {
//         titleInput.map((item: any) => {
//           inputForm.push({ name: item, content: null });
//         });
//       }
//       const handleInput = () => {
//         setForm(inputForm);
//         console.log(form);
//       };

//       const readProperties = (schema:any)=>{
//         if(schema){
            
//             readProperties(schema);
//         }
//         return 1;
//       }

//   return (
//     <div>
//         <h3>{props.title}</h3>
//         <form>
//         {inputForm &&
//           inputForm.map((item: any) => (
//             <div key={item}>
//               <label>{item.name}</label>
//               <input
//                 onChange={(e) => {
//                   item.content = e.target.value;
//                 }}
//               />
//             </div>
//           ))}
          
//         </form>
//         <button onClick={handleInput}>Submit</button>

//     </div>
//   )
// }

