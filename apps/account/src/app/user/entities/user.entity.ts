import { AccountChangedCourse } from '@services/contracts';
import { IDomainEvent, IUser, IUserCourses, PurchaseState, UserRole } from '@services/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
    _id?: string
    displayName?: string
    email: string
    passwordHash: string
    role: UserRole
    courses?: IUserCourses[]
    events: IDomainEvent[] = []

    constructor (user: IUser) {
        this._id = user._id
        this.passwordHash = user.passwordHash
        this.displayName = user.displayName
        this.email = user.email
        this.role = user.role
        this.courses = user.courses
    }

    public getCourseState(courseId: string): PurchaseState {
		return this.courses.find(c => c.courseId === courseId)?.purchaseState ?? PurchaseState.Started;
	}
    
    public setCourseStatus (courseId: string, state: PurchaseState) {
        const exist = this.courses.find(c => c._id === courseId)
        if (!exist) {
            this.courses.push({
                courseId,
                purchaseState: state,
            }) 
            return this
        }
        if (state ===  PurchaseState.Canceled) {
            this.courses = this.courses.filter(c => c._id !== courseId)
            return this
        }
        this.courses = this.courses.map(c => {
            if (c._id === courseId) {
                c.purchaseState = state
            }
            return c
        })
        this.events.push({
            topic: AccountChangedCourse.topic,
            data: { courseId, userId: this._id, state },
        })
        return this
    }

    public getPublicProfile() {
        return {
            _id: this._id,
            email: this.email,
            role: this.role,
            displayName: this.displayName,
        }
    }

    public async setPassword(password: string) {
        const salt = await genSalt(10)
        this.passwordHash = await hash(password, salt)
        return this
    }

    public validatePassword (password: string) {
        return compare(password, this.passwordHash)
    }

    public updateProfile(displayName: string) {
        this.displayName = displayName
        return this
    }
}