import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
    Query: {
        students(): any {
            return database.students;
        },
        student(__: void, {id}): any {
            const result = database.students.find(student => student.id === id)
            if(!result){
                return {
                    id: '-1',
                    name: `student not found by id ${id}`,
                    email: '',
                    courses: []
                };
            }
            return result;
        },
        courses(): any {
            return database.courses;
        },
        course(__, {id}): any {
            const result = database.courses.find(course => course.id === id)
            if(!result){
                return {
                    id: '-1',
                    title: `course not found by id ${id}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    level: 'ALL',
                    path: '',
                    teacher: '',
                    logo: '',
                    reviews: []

                }
            }
            return result;
        }
    }
}

export default query;