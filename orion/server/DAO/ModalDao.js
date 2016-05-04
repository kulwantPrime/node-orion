/**
 * 
 */

var db = require('./db-config.js');

/*
 * {
 * 	id,
 * 	name,
 * 	isDynamic,
 * 	modelDetail : [
 * 		type,
 * 		level,
 * 		toleranceLow,
 * 		toleranceUpper
 * 	]
 * 
 * }
 * 
*/
var saveModal = function(data,cb){
	
	var response = {
			status : 0,
			msg : null
	}
	
	saveBaseModal(data,function(err,modal){
		if(err){
			response.msg = err;
			cb(err,response);
			return response;
		}else{
			
			if(!!data.modelDetail && data.modelDetail.length > 0){
				console.log(data.modelDetail);
				/*data.modelDetail.data = data.modelDetail
				JSON.stringify(data.modelDetail);
				data.modelDetail = JSON.parse(data.modelDetail).data;
				console.log("printing model detail data");
				console.log(data.modelDetail);*/
				console.log("=================================");
				data.modelId = modal.insertId
				console.log(data.modelId = modal.insertId);
				saveActualModal(data,function(err,modalDetailStatus){
					if(err){
						response.msg = err;
						cb(err,response);
						return response;
					}else{
						response.status = 1;
						response.msg = "done";
						getModal({pageNumber:1,count:50},function(row){					
							cb(null,row);
						});
					}
				});				
			}else{
				response.status = 1;
				response.msg = "done";
				getModal({pageNumber:1,count:50},function(row){					
					cb(null,row);
				});
			}
		}
	});
	
}

/*
 * id,
 * name,
 * isDynamic
 * status,
 * communityId
 * ownerId, int
 * accessLevel,
 * searchTag,
 * isDeleted
 * createdDate
 * createdBy = varchar
 * updateDate = 
 * updatedBy
 * Entity - modal
 * 
*/
var saveBaseModal = function(data,cb){
	db.query('INSERT INTO models SET ?',
			{
				Name : data.name,
				/*IsDynamic : data.isDynamic,*/
				Status : data.status,
				CommunityId : data.communityId,
				ownerId : data.ownerId,
				AccessLevel : data.accessLevel,
				IsDeleted : data.isDeleted,
				CreatedDate : data.createdDate,
				CreatedBy : data.createdBy,
				UpdatedDate : data.updatedDate,
				UpdatedBy : data.updatedBy
			}
		,function(err,row){
			if(err){
				cb(err,null);
				return console.log(err);
			}
			console.log(row);
			cb(null,row);
	});
}


/*
 * id,
 * modelId,
 * parentId,
 * accessType - int, 		
 * type,
 * level,
 * toleranceUpper
 * toleranceLower,
 * rebalancePriority - int
 * isDeleted - boolean
 * createdBy = varchar
 * updateDate = 
 * updatedBy
 * 
 * entity - model_detail
*/
var saveActualModalLevel = function(data,cb){
	
	db.query('INSERT INTO modeldetails SET ?',
				{	ModelId : data.modelId,
					ParentId : data.parentId,
					AssetType : data.assetType,
					/*Level : data.level, */
					ToleranceLower : data.toleranceLower,
					ToleranceUpper : data.toleranceUpper,
					RebalancePriority : data.rebalancePriority,
					IsDeleted : data.isDeleted,
					CreatedDate : data.createdDate,
					CreatedBy : data.createdBy,
					UpdatedDate : data.updatedDate,
					UpdatedBy : data.updatedBy
				}
	,function(err,row){
		if(err){
			console.log(err);
			return cb(err,null); 
		}
		console.log(row);
		cb(null,row);
	});
}

var saveActualModal = function(data,cb,count){
	var response = {
			status : 0,
			msg : "no model detail"
	}
	var i = !count ?  0 : count;
	console.log("printing data");
	console.log(data);
	if(!!data.modelDetail[i] && data.modelDetail.length > 0 && i <= data.modelDetail.length){
		var modeldetail = data.modelDetail[i];
		modeldetail["modelId"] = data.modelId;
		saveActualModalLevel(data.modelDetail[i],function(err,row){
			if(err){
				console.log(err);
				return cb(err,null);
			}else{
				saveActualModal(data,cb,++i);
			}
		})		
	}else{
		cb(null,response);
	}
}

var getModal = function(pagination,cb){
	// db.getConnection(function(err, connection) {
	  // // connected! (unless `err` is set) 
	  // console.log(err);
		var limit = pagination.count;
		var offset = (pagination.pageNumber - 1)*limit;
		console.log(limit);
		console.log(offset);	
		db.query('SELECT * from models left outer join modeldetails on models.Id = modeldetails.ModelId limit ? offset ?',[limit,offset],function(err,row){
			if(err){
				console.log(err);
				return 	cb(err);
			}
			cb(row);
		});
	// });
}



exports.getModal = getModal;
exports.saveModal= saveModal;